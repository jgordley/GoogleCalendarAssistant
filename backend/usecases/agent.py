from langchain.agents import (
    Tool,
    AgentExecutor,
    LLMSingleActionAgent,
    AgentOutputParser,
)
from langchain.prompts import StringPromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from typing import List, Union
from langchain.schema import AgentAction, AgentFinish, OutputParserException
from langchain.tools import BaseTool
from usecases import GetCalendarEventsTool, TimeConverterTool
import json


# def run_agent_test():
#     llm = ChatOpenAI(model="gpt-3.5-turbo-0613", temperature=0)

#     tools = [GetCalendarEventsTool()]

#     agent = initialize_agent(tools, llm, agent=AgentType.OPENAI_FUNCTIONS, verbose=True)

#     agent.run("What are my events coming up over the next 7 days?")
# Set up the base template

template = """You are a Calendar Assistant. You have access to the following tools:

{tools}

Use the following format:

Question: the input question you must answer about the user's calendar
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: a list of input values given the schema, in JSON format example {{"input1":"x", "input2":"y"}}
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

You do not know the current day or time, when in doubt, use the time converter. Begin!

Question: {input}
{agent_scratchpad}"""

tools = [GetCalendarEventsTool(), TimeConverterTool()]


def format_tool_input_schema(tool: BaseTool) -> str:
    schema = tool.args_schema.schema().get("properties")
    if not schema:
        return ""
    return "\n".join(
        [
            f"{key}: {value.get('type')} {value.get('description')}"
            for key, value in schema.items()
        ]
    )


def extract_action_input(response_text):
    # Split the response by newline
    lines = response_text.split("\n")

    # Loop through each line
    for line in lines:
        # Check if the line starts with "Action Input:"
        if line.startswith("Action Input:"):
            # Extract the JSON string part
            json_str = line.replace("Action Input:", "").strip()

            # Try to parse the JSON string into a dictionary
            try:
                return json.loads(json_str)
            except json.JSONDecodeError:
                print("Error decoding JSON")
                return None


def extract_action(response_text):
    # Split the response by newline
    lines = response_text.split("\n")

    # Loop through each line
    for line in lines:
        # Check if the line starts with "Action Input:"
        if line.startswith("Action:"):
            # Extract the JSON string part
            json_str = line.replace("Action:", "").strip()
            return json_str


# Set up a prompt template
class CustomPromptTemplate(StringPromptTemplate):
    # The template to use
    template: str
    # The list of tools available
    tools: List[BaseTool]

    def format(self, **kwargs) -> str:
        # Get the intermediate steps (AgentAction, Observation tuples)
        # Format them in a particular way
        intermediate_steps = kwargs.pop("intermediate_steps")
        thoughts = ""
        for action, observation in intermediate_steps:
            thoughts += action.log
            thoughts += f"\nObservation: {observation}\nThought: "
        # Set the agent_scratchpad variable to that value
        kwargs["agent_scratchpad"] = thoughts
        # Create a tools variable from the list of tools provided
        kwargs["tools"] = "\n".join(
            [
                f"{tool.name}: {tool.description}. Input schema: [{format_tool_input_schema(tool)}]"
                for tool in self.tools
            ]
        )
        # Create a list of tool names for the tools provided
        kwargs["tool_names"] = ", ".join([tool.name for tool in self.tools])
        # print(self.template.format(**kwargs))
        return self.template.format(**kwargs)


class CustomOutputParser(AgentOutputParser):
    def parse(self, llm_output: str) -> Union[AgentAction, AgentFinish]:
        # dict_kwargs = extract_action_input(llm_output)
        # print(dict_kwargs)
        # return AgentFinish(
        #     # Return values is generally always a dictionary with a single `output` key
        #     # It is not recommended to try anything else at the moment :)
        #     return_values={"output": "hey"},
        #     log=llm_output,
        # )
        # Check if agent should finish
        if "Final Answer:" in llm_output:
            return AgentFinish(
                # Return values is generally always a dictionary with a single `output` key
                # It is not recommended to try anything else at the moment :)
                return_values={"output": llm_output.split("Final Answer:")[-1].strip()},
                log=llm_output,
            )
        # Parse out the action and action input
        try:
            dict_kwargs = extract_action_input(llm_output)
            action = extract_action(llm_output)
            # print("====================")
            # print("Dict kwargs: ", dict_kwargs)
            # print("Action: ", action)
            # print("====================")
        except:
            raise OutputParserException(f"Could not parse LLM output: `{llm_output}`")

        # Return the action and action input
        return AgentAction(tool=action, tool_input=dict_kwargs, log=llm_output)


def run_agent_test():
    prompt = CustomPromptTemplate(
        template=template,
        tools=tools,
        # This omits the `agent_scratchpad`, `tools`, and `tool_names` variables because those are generated dynamically
        # This includes the `intermediate_steps` variable because that is needed
        input_variables=["input", "intermediate_steps"],
    )

    output_parser = CustomOutputParser()
    llm = OpenAI(temperature=0, model="gpt-3.5-turbo-instruct")

    # LLM chain consisting of the LLM and a prompt
    llm_chain = LLMChain(llm=llm, prompt=prompt)

    tool_names = [tool.name for tool in tools]
    agent = LLMSingleActionAgent(
        llm_chain=llm_chain,
        output_parser=output_parser,
        stop=["\nObservation:"],
        allowed_tools=tool_names,
    )

    agent_executor = AgentExecutor.from_agent_and_tools(
        agent=agent, tools=tools, verbose=True
    )
    agent_executor.run(
        "UserID: jack123, CalendarID: 15c, User prompt: Can you list my calendar events over the next month?"
    )
