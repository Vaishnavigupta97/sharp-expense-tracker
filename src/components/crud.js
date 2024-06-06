const url = "https://myproject-ba88e-default-rtdb.firebaseio.com/expense.json";

// Get all expenses

export async function getAllExpense(userId) {
  try {
    let response = await fetch(
      
      // `https://myproject-ba88e-default-rtdb.firebaseio.com/${userId}.json`
      `https://myproject-ba88e-default-rtdb.firebaseio.com/${userId}.json`

    );

    let data = await response.json();

    //if (data.error) return alert(data.error.message);
    //else {
    let arr = [];
    for (let key in data) {
      data[key].id = key;
      arr.push(data[key]);
    }
    console.log(data);
    arr = arr.reverse();
    return arr;
    //}
  } catch (err) {
    console.log(err);
  }
}

// Add Expense

export async function addExpense(payload) {
  const { amount, description, category, userId } = payload;

  try {
    let response = await fetch(
      `https://myproject-ba88e-default-rtdb.firebaseio.com/${userId}.json`,
    

      {
        method: "POST",
        body: JSON.stringify({ amount, description, category }),
      }
    );

    let data = await response.json();

    if (data.error) return alert(data.error.message);
    else {
      return getAllExpense(userId);
    }
  } catch (err) {
    console.log(err);
  }
}

// Delete Expense

export async function deleteExpense(payload) {
  const { id, userId } = payload;
  console.log(id, userId);
  try {
    let response = await fetch(
      `https://myproject-ba88e-default-rtdb.firebaseio.com/${userId}/${id}.json`,
      {
        method: "DELETE",
      }
    );

    return getAllExpense(userId);
  } catch (err) {
    console.log(err);
  }
}

// Edit Expense

export async function editExpense(payload) {
  const { id, userId, amount, description, category } = payload;
  try {
    let response = await fetch(
      `https://myproject-ba88e-default-rtdb.firebaseio.com/${userId}/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ amount, description, category }),
      }
    );

    let data = await response.json();

    if (data.error) return alert(data.error.message);
    else {
      return getAllExpense(userId);
    }
  } catch (err) {
    console.log(err);
  }
}
