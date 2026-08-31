import { useEffect, useState } from "react";
import api from "../services/api";
import type { Key } from "../types/Key";

function TestPage() {
  const [keys, setKeys] = useState<Key[]>([]);

  useEffect(() => {
    api.get("/keys")
      .then(res => setKeys(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-5">
      <h1>Fitness Keys</h1>

      {keys.map(key => (
        <div key={key.id}>
          {key.keyNumber}
        </div>
      ))}
    </div>
  );
}

export default TestPage;
