const userListElement = document.getElementById("user-list");

fetch("http://localhost:8080/api/users")
  .then((response) => response.json())
  .then((response) => {
    if (!response.success) return;
    const users = response.data;

    users.forEach((user) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const col1 = document.createElement("div");
      const col2 = document.createElement("div");
      const col3 = document.createElement("div");
      col3.className = "icons";

      card.appendChild(col1);
      card.appendChild(col2);
      card.appendChild(col3);

      //   Picture
      const image = document.createElement("img");
      image.src = user.picture;
      image.id = "picture_" + user.id;
      image.alt = `${user.firstname} ${user.lastname} profile picture`;
      col1.appendChild(image);

      //   Job
      const job = document.createElement("input");
      job.classList.add("userId_" + user.id, "job");
      job.placeholder = user.job;
      job.name = "job";
      job.readOnly = true;
      col1.appendChild(job);

      //   Username
      const username = document.createElement("div");
      col2.appendChild(username);
      const firstname = document.createElement("input");
      firstname.className = "userId_" + user.id;
      firstname.style.border = "none";
      firstname.style.fontWeight = "900";
      firstname.placeholder = user.firstname;
      firstname.name = "firstname";
      firstname.readOnly = true;
      const lastname = document.createElement("input");
      lastname.className = "userId_" + user.id;
      lastname.style.border = "none";
      lastname.style.fontWeight = "900";
      lastname.name = "lastname";
      lastname.readOnly = true;
      lastname.placeholder = user.lastname;

      username.appendChild(firstname);
      username.appendChild(lastname);

      //   Address
      const address = document.createElement("div");
      address.classList.add("address", "userId_" + user.id);
      col2.appendChild(address);
      const addressIcon = document.createElement("i");
      addressIcon.style.marginRight = "5px";
      addressIcon.style.color = "#333";
      addressIcon.classList.add("fa-solid", "fa-location-dot");
      address.appendChild(addressIcon);

      const addressName = document.createElement("input");
      addressName.className = "userId_" + user.id;
      addressName.style.border = "none";
      addressName.placeholder = user.address;
      addressName.name = "address";
      addressName.readOnly = true;
      address.appendChild(addressName);

      //   Company
      const company = document.createElement("div");
      col2.appendChild(company);

      const companyName = document.createElement("input");
      companyName.className = "userId_" + user.id;
      companyName.style.border = "none";
      companyName.placeholder = user.company;
      companyName.name = "company";
      companyName.style.fontWeight = "900";
      companyName.readOnly = true;
      company.appendChild(companyName);

      company.appendChild(document.createElement("br"));

      const companyAddress = document.createElement("input");
      companyAddress.className = "userId_" + user.id;
      companyAddress.placeholder = user.workAdress;
      companyAddress.name = "workAdress";
      companyAddress.style.border = "none";
      companyAddress.readOnly = true;
      company.appendChild(companyAddress);

      // Phone
      const phone = document.createElement("input");
      phone.className = "userId_" + user.id;
      phone.placeholder = user.phone;
      phone.name = "phone";
      phone.style.border = "none";
      phone.readOnly = true;
      col2.appendChild(phone);

      //   icon
      const iconsContainer = document.createElement("div");
      iconsContainer.className = "iconsContainer";
      col3.appendChild(iconsContainer);

      const editIcon = document.createElement("i");
      editIcon.classList.add("fas", "fa-pen", "editIcon");
      editIcon.id = user.id;
      iconsContainer.appendChild(editIcon);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash", "deleteIcon");
      deleteIcon.id = user.id;
      iconsContainer.appendChild(deleteIcon);

      userListElement.appendChild(card);
    });

    // const card = document.createElement("div");
    // card.classList.add("card", "fa-solid", "fa-circle-plus");
    // card.id = "addUser";
    // userListElement.appendChild(card);

    // Edit User
    const editBtn = document.querySelector(".editIcon");
    if (editBtn) {
      editBtn.addEventListener("click", (event) => {
        const inputs = document.querySelectorAll(`.userId_${event.target.id}`);
        let user = {
          id: event.target.id,
          picture: document.getElementById("picture_" + event.target.id).src,
        };

        inputs.forEach((el) => {
          if (el.readOnly) {
            el.readOnly = false;
          } else {
            el.readOnly = true;
            user[el.name] = el.value || el.placeholder;
          }
        });

        if (inputs[0].readOnly) {
          const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          };

          fetch(
            `http://localhost:8080/api/users/${event.target.id}`,
            requestOptions
          );
        }
      });
    }

    // Delete USER
    const deleteBtn = document.querySelector(".deleteIcon");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", (event) => {
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        };

        fetch(
          `http://localhost:8080/api/users/${event.target.id}`,
          requestOptions
        );
      });
    }

    const addUserBtn = document.querySelector("#addUser");
    const plus = document.querySelector("#plus");
    if (addUserBtn) {
      addUserBtn.addEventListener("click", () => {
        plus.style.display = "none";
        const form = document.querySelector("#form");
        form.style.display = "flex";
        form.style.flexDirection = "column";
      });
    }

    const create = document.querySelector("#button");
    if (create) {
      create.addEventListener("click", (event) => {
        const inputs = document.querySelectorAll(`.newUser`);
        let user = {};

        inputs.forEach((el) => {
          user[el.name] = el.value;
        });

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        };

        fetch(
          `http://localhost:8080/api/users/create`,
          requestOptions
        );
      });
    }
  })
  .catch((error) => console.log(error));
