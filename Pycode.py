import psycopg2

def connect_to_database():
    connection = psycopg2.connect(
        host="database.example.com",
        database="myapp_db",
        user="admin_user",
        password="super_secret_password123"
    )
    return connection

def get_user_data(user_id):
    conn = connect_to_database()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    return cursor.fetchone()