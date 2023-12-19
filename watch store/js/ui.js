const locations = document.querySelector(".locations");

document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // add recipe form
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "right" });

  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});
const renderLocation = (data, id) => {
  const html = `<div class="card-panel location white row" data-id="${id}">
  <img src="/img/icons/icon192.png" alt=" thumb">
  <div class="location-details">
    <div class="watchname">${data.watchname}</div>
    <div class="watchclass">${data.watchclass}</div>
    <div class="watchprice">${data.watchprice}</div>
    <div class="watchqty">${data.watchqty}</div>
  </div>
  <i style = "text-align:top;cursor:pointer;postion:relative;" class="material-icons modal-trigger" href="#edit_location_modal">edit</i>
  <div class="location-delete">
  <i style="cursor: pointer;"
  class="material-icons" data-id="${id}">delete_outline</i>
  </div>
</div>`;
  locations.innerHTML += html;
};
const removeLocation = (id) => {
  const locations = document.querySelector(`.location[data-id=${id}]`);
  locations.remove();
};
