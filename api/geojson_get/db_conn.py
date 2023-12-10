import psycopg
from psycopg import sql

class Database:
    def __init__(self, connect_params):
        self.conn = psycopg.connect(**connect_params)
        self.cur = self.conn.cursor()
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
        self.multi_features = sql.SQL("""
            SELECT jsonb_build_object(
                'type', 'FeatureCollection',
                'features', jsonb_agg(features.feature)
            )
            FROM (
                {single_feature}
            ) features;
            """)

    def get_feature(self, adm, id):
        where = sql.SQL("id = %s")
        query = self.single_feature.format(
            geom_table=sql.Identifier(adm),
            where=where
        )
        with self.conn.transaction():
            self.cur.execute(query, [id])
            return self.cur.fetchone()[0]

    def get_features(self, adm, ids):
        where = sql.SQL("id = ANY(%s)")
        single = self.single_feature.format(
            geom_table=sql.Identifier(adm),
            where=where
        )
        query = self.multi_features.format(single_feature=single)

        with self.conn.transaction():
            self.cur.execute(query, [ids])
            return self.cur.fetchone()[0]
        
    def get_org(self, orgname):
        where = sql.SQL("""
            id IN (
                SELECT adm0_id
                FROM Memberships
                WHERE org_id = %s
            )
            """)
        single = self.single_feature.format(
            geom_table=sql.Identifier("adm0"),
            where=where
        )
        query = self.multi_features.format(single_feature=single)
        with self.conn.transaction():
            self.cur.execute(query, [orgname])
            return self.cur.fetchone()[0]
