python
def get_user_data(user_id):
    conn = connect_to_database()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
    return cursor.fetchone()
