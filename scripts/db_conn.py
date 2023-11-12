import psycopg
from psycopg import sql

class Database:
    def __init__(self, connect_params):
        self.conn = psycopg.connect(**connect_params)
        self.single_feature = sql.SQL("""
            SELECT jsonb_build_object(
                'type', 'Feature',
                'id', id,
                'geometry', ST_AsGeoJSON(simple)::jsonb,
                'properties', to_jsonb(row) - 'id' - 'simple'
            ) AS feature
            FROM (
                SELECT *
                FROM {geom_table}
                WHERE {where}
            ) row
            """)

    def get_feature(self, adm, id):
        where = sql.SQL("id = %s")
        query = self.single_feature.format(
            geom_table=sql.Identifier(adm),
            where=where
        )
        with self.conn.cursor() as cur:
            cur.execute(query, [id])
            return cur.fetchone()[0]

    def get_features(self, adm, ids):
        where = sql.SQL("id = ANY(%s)")
        single = self.single_feature.format(
            geom_table=sql.Identifier(adm),
            where=where
        )
        query = sql.SQL("""
            SELECT jsonb_build_object(
                'type', 'FeatureCollection',
                'features', jsonb_agg(features.feature)
            )
            FROM (
                {single_feature}
            ) features;
            """).format(single_feature=single)

        with self.conn.cursor() as cur:
            cur.execute(query, [ids])
            return cur.fetchone()[0]
        
    def get_org(self, orgname):
        where = sql.SQL("""
            id IN (
                SELECT adm0_id
                FROM Memberships
                WHERE org_id = %s
            )
            """)
        query = self.single_feature.format(
            geom_table=sql.Identifier("ADM0"),
            where=where
        )
        with self.conn.cursor() as cur:
            cur.execute(query, [orgname])
            return cur.fetchone()[0]
