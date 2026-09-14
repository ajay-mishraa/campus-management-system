function Alert({
  message,
  type = "info",
  onClose,
}) {
  if (!message) {
    return null;
  }

  return (
    <div className={`alert alert-${type}`}>

      <span className="alert-message">
        {message}
      </span>

      {onClose && (
        <button
          type="button"
          className="alert-close"
          onClick={onClose}
        >
          ×
        </button>
      )}

    </div>
  );
}

export default Alert;