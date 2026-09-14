function Card({
  title,
  children,
  className = "",
}) {
  return (
    <div className={`common-card ${className}`}>

      {title && (
        <div className="card-header">
          <h2>{title}</h2>
        </div>
      )}

      <div className="card-body">
        {children}
      </div>

    </div>
  );
}

export default Card;