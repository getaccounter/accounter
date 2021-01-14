from django.core.exceptions import PermissionDenied


def signin_required(func):
    def wrapper(*args, **kwargs):
        if not args[1].context.user.is_authenticated:
            raise PermissionDenied("You do not have permission to perform this action")
        else:
            return func(*args, **kwargs)

    return wrapper


def admin_required(func):
    @signin_required
    def wrapper(*args, **kwargs):
        if not args[1].context.user.profile.is_admin:
            raise PermissionDenied("You do not have permission to perform this action")
        else:
            return func(*args, **kwargs)

    return wrapper
