Here is the code with the identified issues fixed:

def get_user_data(user_id):
    conn = connect_to_database()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    return cursor.fetchone()