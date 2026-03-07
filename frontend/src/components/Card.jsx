export default function Card({header, children}) {
  return (
    <div className="card card-candy shadow">
        {
        header ?
        <div className="card-header candy-stripe">
            <h3 className="sugar-font">{header}</h3>
        </div> 
        : undefined}
      
      <div className="card-body">
          { children }
      </div>
  </div>
  );
}