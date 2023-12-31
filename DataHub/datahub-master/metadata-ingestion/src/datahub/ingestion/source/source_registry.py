import warnings

from datahub.configuration.common import ConfigurationWarning
from datahub.ingestion.api.registry import PluginRegistry
from datahub.ingestion.api.source import Source

source_registry = PluginRegistry[Source]()
source_registry.register_from_entrypoint("datahub.ingestion.source.plugins")

# Deprecations.
source_registry.register_alias(
    "snowflake-beta",
    "snowflake",
    lambda: warnings.warn(
        "source type snowflake-beta is deprecated, use snowflake instead",
        ConfigurationWarning,
        stacklevel=3,
    ),
)
source_registry.register_alias(
    "bigquery-beta",
    "bigquery",
    lambda: warnings.warn(
        "source type bigquery-beta is deprecated, use bigquery instead",
        ConfigurationWarning,
        stacklevel=3,
    ),
)

source_registry.register_alias(
    "redshift-usage",
    "redshift-usage-legacy",
    lambda: warnings.warn(
        "source type redshift-usage is deprecated, use redshift source instead as usage was merged into the main source",
        ConfigurationWarning,
        stacklevel=3,
    ),
)

# The MSSQL source has two possible sets of dependencies. We alias
# the second to the first so that we maintain the 1:1 mapping between
# source type and pip extra.
source_registry.register_alias(
    "mssql-odbc",
    "mssql",
)
