import requests

# Replace with your user's access token
ACCESS_TOKEN = "ya29.a0AfB_byDkgMdygtElsnAD2HcqqVlrgSrlK6ckCXYi1TyMJsr-Hi1TuDV7Ic2wmcWZbDNSN61-fu7D2jdd_ibwL1PeECM1bSQ44xjdgEqM63hYvTiSWG6ret_ZfoY-u2lLVQ-1mTjjLptiDPc2dBvxglZ4kEiCqudk9RhRaCgYKAa0SARISFQGOcNnCFSfxdffpbbp9B__xXjhDPA0171"

# Base headers
headers = {"Authorization": "Bearer {}".format(ACCESS_TOKEN)}

# Endpoint for listing calendar lists
endpoint = "https://www.googleapis.com/calendar/v3/users/me/calendarList"

# Make the request
response = requests.get(endpoint, headers=headers)

# Handle the response
if response.status_code == 200:
    calendars = response.json().get("items", [])
    for calendar in calendars:
        print(calendar["summary"])
else:
    print(f"Error {response.status_code}: {response.text}")
