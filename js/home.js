fetch("http://localhost:5000/invoices")
  .then((response) => response.json())
  .then((invoices) => {
    // Handle the retrieved invoice
    // Select the elements
    const container = document.querySelector(".li_container");
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    invoices.forEach((invoice) => {
      console.log(invoice);
      console.log(invoice.li_id);
      const date = new Date(invoice.li_due_date).toLocaleDateString(
        "id-ID",
        dateOptions
      );
      const money = formatter.format(invoice.li_total_payment);

      console.log(invoice.li_total_payment);
      console.log(money);

      const invoiceElement = document.createElement("div");
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
              class="text-sm font-semibold text-emerald-600 bg-emerald-50 py-1 px-4 w-auto rounded-full text-center border border-emerald-300"
            >
              Sudah dibayar
            </h2>
          </div>
          <div class="my-auto text-right">
            <button
            class=" font-inter bg-slate-100 text-slate-500 font-medium w-auto py-2 px-8 rounded-md disabled:opacity-50"
            disabled
            >
              Bayar
            </button>
          </div>
          
        </div>`;
      container.appendChild(invoiceElement);
      // container.appendChild("<hr />");

      console.log(invoice.li_status);
      // const idElement = document.querySelector(".li_id");
      // const totalPaymentElement = document.querySelector(".li_total_payment");
      // const dueDateElement = document.querySelector(".li_due_date");
      // // Insert the data into the elements
      // idElement.innerHTML = invoice.li_id;
      // totalPaymentElement.innerHTML = invoice.li_total_payment;
      // dueDateElement.innerHTML = invoice.li_due_date;
    });

    // console.log(invoice);
  })
  .catch((error) => {
    // Handle any errors
    console.error("Error:", error);
  });
