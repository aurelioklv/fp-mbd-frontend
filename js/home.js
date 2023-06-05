const locale = "id-ID";
const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const formatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "IDR",
});

fetch("http://localhost:5000/account")
  .then((response) => response.json())
  .then((data) => {
    data = data[0];
    const name = data.acc_name;
    const balance = formatter.format(data.acc_balance);

    const nameElement = document.getElementById("acc_name");
    const balanceElement = document.getElementById("acc_balance");

    nameElement.innerText = `Halo, ${name}`;
    balanceElement.innerText = balance;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

fetch("http://localhost:5000/invoices")
  .then((response) => response.json())
  .then((data) => {
    const container = document.querySelector(".li_container");

    const paidInvoices = data.filter((invoice) => invoice.li_status === false);
    const billedInvoices = data.filter((invoice) => invoice.li_status === true);

    console.log(paidInvoices);
    console.log(billedInvoices);

    const invoices = paidInvoices.concat(billedInvoices);
    invoices.forEach((invoice) => {
      const date = new Date(invoice.li_due_date).toLocaleDateString(
        locale,
        dateOptions
      );
      const money = formatter.format(invoice.li_total_payment);

      const invoiceElement = document.createElement("div");
      const hr = document.createElement("hr");
      invoiceElement.id = invoice.li_id;
      invoiceElement.innerHTML = `
        <div class="grid grid-cols-4 gap-5 justify-between text-align-start">
          <div class="">
            <p class="text-sm text-slate-400 li_id">${invoice.li_id}</p>
            <h2 class="text-lg font-semibold text-slate-700 li_total_payment">
              ${money}
            </h2>
          </div>
          <div class="">
            <p class="text-sm text-slate-400">Tenggat Pembayaran</p>
            <h2 class="text-base font-semibold text-slate-700 li_due_date">
              ${date}
            </h2>
          </div>
          <div class="m-auto">
            <h2
              class="text-sm font-semibold py-1 px-4 w-auto rounded-full text-center border ${
                invoice.li_status
                  ? "text-emerald-600 bg-emerald-50 border-emerald-300"
                  : "text-red-600 bg-red-100 border-red-300"
              }"
            >
              ${invoice.li_status ? "Sudah dibayar" : "Belum dibayar"}
            </h2>
          </div>
          <div class="my-auto text-right">
            <button
            class=" font-inter  font-medium w-auto py-2 px-8 rounded-md ${
              invoice.li_status
                ? "bg-slate-100 text-slate-500 disabled:opacity-50"
                : "bg-orange-100 text-orange-500 hover:bg-orange-200"
            }"
            ${invoice.li_status ? "disabled" : ""}
            >
              Bayar
            </button>
          </div>
          
        </div>`;
      container.appendChild(invoiceElement);
      container.appendChild(hr);
    });

    // console.log(invoice);
  })
  .catch((error) => {
    // Handle any errors
    console.error("Error:", error);
  });
