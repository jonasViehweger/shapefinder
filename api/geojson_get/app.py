from db_conn import Database
from configparser import ConfigParser

from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.logging import correlation_paths
from aws_lambda_powertools import Logger
from aws_lambda_powertools import Tracer
from aws_lambda_powertools import Metrics
from aws_lambda_powertools.metrics import MetricUnit
import psycopg
from psycopg import sql

parser = ConfigParser()
# read config file
parser.read("database.ini")
params = dict(parser["aws"])

# CORS will match when Origin
cors_config = CORSConfig(allow_origin="*", allow_headers=["Content-Type", "access-control-allow-origin"])
app = APIGatewayRestResolver(cors=cors_config)
tracer = Tracer()
logger = Logger()
metrics = Metrics(namespace="Powertools")
db = Database(params)

@app.get("/adm0/<iso>")
@tracer.capture_method
def get_adm0_by_iso(iso: str):
    # adding custom metrics
    # See: https://awslabs.github.io/aws-lambda-powertools-python/latest/core/metrics/
    metrics.add_metric(name="Adm0Invocations", unit=MetricUnit.Count, value=1)

    # structured log
    # See: https://awslabs.github.io/aws-lambda-powertools-python/latest/core/logger/
    logger.info("Adm0 API - HTTP 200")
    return db.get_feature(adm="adm0", id=iso)

@app.get("/adm0")
@tracer.capture_method
def get_adm0():
    # adding custom metrics
    # See: https://awslabs.github.io/aws-lambda-powertools-python/latest/core/metrics/
    metrics.add_metric(name="Adm0Invocations", unit=MetricUnit.Count, value=1)

    # structured log
    # See: https://awslabs.github.io/aws-lambda-powertools-python/latest/core/logger/
    logger.info("Adm0 API - HTTP 200")
    return db.get_list()

@app.get("/adm1/<adm1_id>")
@tracer.capture_method
def get_adm1_by_id(adm1_id: str):
    # adding custom metrics
    # See: https://awslabs.github.io/aws-lambda-powertools-python/latest/core/metrics/
    metrics.add_metric(name="Adm1Invocations", unit=MetricUnit.Count, value=1)

    # structured log
    # See: https://awslabs.github.io/aws-lambda-powertools-python/latest/core/logger/
    logger.info("Adm1 API - HTTP 200")
    return db.get_feature(adm="adm1", id=adm1_id)

@app.get("/org/<org_id>")
@tracer.capture_method
def get_org_by_id(org_id: str):
    # adding custom metrics
    # See: https://awslabs.github.io/aws-lambda-powertools-python/latest/core/metrics/
    metrics.add_metric(name="OrgInvocations", unit=MetricUnit.Count, value=1)

    # structured log
    # See: https://awslabs.github.io/aws-lambda-powertools-python/latest/core/logger/
    logger.info("Org API - HTTP 200")
    return db.get_org(org_id)

# Enrich logging with contextual information from Lambda
@logger.inject_lambda_context(correlation_id_path=correlation_paths.API_GATEWAY_REST)
# Adding tracer
# See: https://awslabs.github.io/aws-lambda-powertools-python/latest/core/tracer/
@tracer.capture_lambda_handler
# ensures metrics are flushed upon request completion/failure and capturing ColdStart metric
@metrics.log_metrics(capture_cold_start_metric=True)
def lambda_handler(event: dict, context: LambdaContext) -> dict:
    return app.resolve(event, context)
