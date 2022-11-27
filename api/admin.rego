package angelkey.admin

import input.keywords.in

default allow = false

allow{
    contains(input.path, "/api/admin/")
    "admin" in token.payload.groups
}

token = {"payload": paylaod}{
    [_, payload, _] := io.jwt.decode(input.token)
}