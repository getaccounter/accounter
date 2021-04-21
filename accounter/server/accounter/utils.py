import graphene
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


def owner_required(func):
    @signin_required
    def wrapper(*args, **kwargs):
        if not args[1].context.user.profile.is_owner:
            raise PermissionDenied("You do not have permission to perform this action")
        else:
            return func(*args, **kwargs)

    return wrapper


class ExtendedConnection(graphene.relay.Connection):
    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(cls, node=None, name=None, **options):
        result = super().__init_subclass_with_meta__(node=node, name=name, **options)
        cls._meta.fields["total_count"] = graphene.Field(
            type=graphene.Int,
            name="totalCount",
            description="Number of items in the queryset.",
            required=True,
            resolver=cls.resolve_total_count,
        )
        return result

    def resolve_total_count(self, *_) -> int:
        return self.iterable.count()
