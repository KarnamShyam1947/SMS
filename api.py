import requests, json

res = requests.post(
    url="http://localhost:3000/courses",
    data=json.dumps({
        "title" : "SWE3004",
        "name" : "FDAT",
        "all-slot" : [
            {
                "slot" : "A1+TA1",
                "faculty" : "f1"
            },
            {
                "slot" : "A2+TA2",
                "faculty" : "f2"
            }
        ],
    }),
    headers= {
        'Content-Type' : 'application/json',
    }
)
print(res.text)

# res = requests.get(
#     url="http://localhost:3000/student/1",
# )
# print(res.text)
