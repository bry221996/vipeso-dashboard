export default function (statusId) {
  let status;
  switch (statusId) {
    case 1:
      status = { text: 'Unpaid', variant: 'warning' };
      break;
    case 3:
      status = { text: 'Shipping', variant: 'info' };
      break;
    case 4:
      status = { text: 'Cancelled', variant: 'dark' };
      break;
    case 5:
      status = { text: 'Void', variant: 'danger' };
      break;

    default:
      status = { text: 'Paid', variant: 'success' };
      break;
  }

  return `<span class='pl-2 pr-2 badge bg-${status.variant}'>${status.text}</span>`;
}
