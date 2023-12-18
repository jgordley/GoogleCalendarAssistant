# Calvin: A Google Calendar Assistant

Google Calendar LLM Assistant built with Next.js, FastAPI, and MongoDB. Assistant logic built using [Langchain](https://www.langchain.com/) and the OpenAI API. 

![Calvin Homepage](/screenshots/calvin.png)

Blog Post: [https://gordles.io/posts/calvin](https://gordles.io/posts/calvin)

## Prerequisites
1. OpenAI API Account - [https://openai.com/blog/openai-api](https://openai.com/blog/openai-api)
2. Google Cloud Console Account - [https://console.cloud.google.com/welcome/new](https://console.cloud.google.com/welcome/new)
3. Docker - [https://docs.docker.com/engine/install](https://docs.docker.com/engine/install)

## Docker Setup

To run this project using docker, ensure all `.env` variables are set that are listed in the `.env.sample` file. You can kick off the entire project by simply running

```bash
make down build up
```

## Individual Component Setup

You can also run the individual components using `make`:
- Next.js - `make run-frontend`
- MongoDB - `make run-database`
- FastAPI - `make run-server`

### Next.js Frontend Component

Navigate to the frontend directory and install all necessary node packages then run the project.

```bash
cd frontend
npm install
npm run dev
```

### MongoDB Component
You can run Mongo in several ways, just ensure that the `MONGODB_URI` env variable is updated.
1. Docker mongo image [https://hub.docker.com/_/mongo](https://hub.docker.com/_/mongo)
2. MongoDB hosted [https://www.mongodb.com](https://www.mongodb.com/)

### FastAPI Backend Component

Navigate to the backend directory and install the necessary python packages, then run the server.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)