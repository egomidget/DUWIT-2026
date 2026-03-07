export default function Card({header, children}) {
  return (
    <div class="card card-candy shadow">
        {
        header ?
        <div class="card-header candy-stripe">
            <h3 class="sugar-font">{header}</h3>
        </div> 
        : undefined}
      
      <div class="card-body">
          { children }
      </div>
  </div>
  );
}