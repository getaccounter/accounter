from django.core.exceptions import PermissionDenied


def signin_required(func):
    def wrapper(*args, **kwargs):
        print(args[1].context.user)
        if args[1].context.user.is_authenticated:
            return func(*args, **kwargs)
        else:
            raise PermissionDenied("You do not have permission to perform this action")

    return wrapper
