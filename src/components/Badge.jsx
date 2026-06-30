const statusStyles = {
  Placed: { bg: "#EEF2FF", text: "#3730A3" },
  Preparing: { bg: "#FFF7ED", text: "#C2410C" },
  "Out for Delivery": { bg: "#ECFDF5", text: "#065F46" },
  Delivered: { bg: "#F0FDF4", text: "#166534" },
};

export default function Badge({ status }) {
  const style = statusStyles[status] || statusStyles.Placed;

  return (
    <span
      style={{ backgroundColor: style.bg, color: style.text }}
      className="font-body text-xs font-semibold px-3 py-1.5 rounded-full inline-block"
    >
      {status}
    </span>
  );
}
