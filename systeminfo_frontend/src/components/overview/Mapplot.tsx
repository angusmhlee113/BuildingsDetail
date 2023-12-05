import { useEffect, useState } from "react";

const Mapplot = ({ lat, lng }: { lat: string; lng: string }) => {
  const [loading, setLoading] = useState(true);
  const [ifameData, setIframeData] = useState("");

  useEffect(() => {
    const latitude = lat.toString();
    const longitude = lng.toString();
    setIframeData(
      `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`,
    );
    setLoading(false);
  }, [lat, lng]);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <iframe src={ifameData} height="300px" width="100%"></iframe>
      )}
    </div>
  );
};

export default Mapplot;
