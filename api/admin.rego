package simple

default allow = false

allow = true{
    role = input.subject.roles[_]
    role == "admin"
}