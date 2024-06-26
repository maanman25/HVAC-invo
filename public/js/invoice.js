// To create new invoice

const newFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector("#inputFirst").value.trim();
  const last_name = document.querySelector("#inputLast").value.trim();
  const email = document.querySelector("#inputEmail").value.trim();
  const phone = document.querySelector("#inputPhone").value.trim();
  const address = document.querySelector("#inputAddress").value.trim();
  const address_two = document.querySelector("#inputAddress2").value.trim();
  const city = document.querySelector("#inputCity").value.trim();
  const state = document.querySelector("#inputState").value.trim();
  const zip = document.querySelector("#inputZip").value.trim();
  const description = document.querySelector("#inputDescription").value.trim();
  const item = document.querySelector("#inputItem").value.trim();
  const cost = document.querySelector("#inputCost").value.trim();

  if (
    first_name &&
    last_name &&
    email &&
    phone &&
    address &&
    city &&
    state &&
    zip &&
    description &&
    item &&
    cost
  ) {
    const response = await fetch(`/api/invoice`, {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        address,
        address_two,
        city,
        state,
        zip,
        description,
        item,
        cost,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.assign("/invoice");
    } else {
      alert("Failed to create invoice");
    }
  }
};

document
  .querySelector("#newInvoiceForm")
  .addEventListener("submit", newFormHandler);
document
  .getElementById("invoice_container")
  .addEventListener("click", async function (e) {
    if (e.target.matches("button")) {
      const confirmDelete = confirm(
        "Are you sure you want to delete this order?"
      );

      // Proceed with deletion only if confirmed
      if (confirmDelete) {
        const result = await fetch(
          `/api/invoice/delete/${e.target.dataset.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(result);
        if (result.ok) {
          document.location.reload();
        }
      }
    }
  });

async function change_status(id, event) {
  const result = await fetch(
    `/api/invoice/update_order_status/${id}/${event.target.value}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (result.ok) {
    document.location.reload();
  }
}
async function delete_order(id) {
  // Display confirmation dialog
  const confirmDelete = confirm("Are you sure you want to delete this order?");

  // Proceed with deletion only if confirmed
  if (confirmDelete) {
    const result = await fetch(`/api/invoice/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(result);

    if (result.ok) {
      document.location.reload();
    }
  }
}
