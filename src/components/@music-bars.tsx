
const MusicBars = () => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="equilizer" viewBox="0 0 128 128">
      <g>
        <title>Audio Equilizer</title>
        <rect className="bar" transform="translate(0,0)" y="15"></rect>
        <rect className="bar" transform="translate(25,0)" y="15"></rect>
        <rect className="bar" transform="translate(50,0)" y="15"></rect>
        <rect className="bar" transform="translate(75,0)" y="15"></rect>
        <rect className="bar" transform="translate(100,0)" y="15"></rect>
      </g>
    </svg>
  );
};

export default MusicBars;
