# DevTinder API's

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/:status/:userId //Status can be ignored or interested
- POST /request/review/:status/:requestId //Status can be accepted or rejected

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Get other user profiles on the platform
