const formatCurrency = (number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(number);

export { formatCurrency };
