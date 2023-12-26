from db_conn import Database
from configparser import ConfigParser
import json

from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.logging import correlation_paths
from aws_lambda_powertools import ( Logger, Tracer, Metrics )
from aws_lambda_powertools.metrics import MetricUnit

parser = ConfigParser()
# read config file
parser.read("database.ini")
params = dict(parser["aws"])

def custom_serializer(obj) -> str:
    """Your custom serializer function APIGatewayRestResolver will use"""
    return json.dumps(obj, ensure_ascii=False)

# CORS will match when Origin
cors_config = CORSConfig(allow_origin="*", allow_headers=["Content-Type", "access-control-allow-origin"])
app = APIGatewayRestResolver(cors=cors_config, serializer=custom_serializer)
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
    metrics.add_metric(name="Adm0Invocations", unit=MetricUnit.Count, value=1)
    logger.info("Adm0 API - HTTP 200")
    return db.get_amd0_list()

@app.get("/adm1")
@tracer.capture_method
def get_adm1():
    metrics.add_metric(name="Adm1Invocations", unit=MetricUnit.Count, value=1)
    logger.info("Adm0 API - HTTP 200")
    return db.get_adm1_list()

@app.get("/org")
@tracer.capture_method
def get_adm1():
    metrics.add_metric(name="OrgInvocations", unit=MetricUnit.Count, value=1)
    logger.info("Adm0 API - HTTP 200")
    return db.get_org_list()

@app.get("/adm1/<adm1_id>")
@tracer.capture_method
def get_adm1_by_id(adm1_id: str):
    metrics.add_metric(name="Adm1Invocations", unit=MetricUnit.Count, value=1)
    logger.info("Adm1 API - HTTP 200")
    return db.get_feature(adm="adm1", id=adm1_id)

@app.get("/org/<org_id>")
@tracer.capture_method
def get_org_by_id(org_id: str):
    metrics.add_metric(name="OrgInvocations", unit=MetricUnit.Count, value=1)
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
