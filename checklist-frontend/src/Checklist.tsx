import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChecklistItem } from "./ChecklistItem";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const API_URL = "http://localhost:8080/api/checklist";

const Checklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItem, setNewItem] = useState<string>("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get<ChecklistItem[]>(API_URL);
    setItems(res.data);
  };

  const addItem = async () => {
    if (!newItem.trim()) return;

    const res = await axios.post<ChecklistItem>(API_URL, {
      description: newItem,
      completed: false,
    });
    setItems([...items, res.data]);
    setNewItem("");
  };

  const updateItem = async (item: ChecklistItem) => {
    const res = await axios.put<ChecklistItem>(`${API_URL}/${item.id}`, {
      ...item,
      completed: !item.completed,
    });
    setItems(items.map((i) => (i.id === res.data.id ? res.data : i)));
  };

  const deleteItem = async (id?: number) => {
    if (!id) return;
    await axios.delete(`${API_URL}/${id}`);
    setItems(items.filter((i) => i.id !== id));
  };

  const handleExport = async () => {
    const checklistElement = document.getElementById("checklist-container");
    if (!checklistElement) return;

    const canvas = await html2canvas(checklistElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.text("Checklist Report", 10, 10);
    pdf.addImage(imgData, "PNG", 10, 20, 180, 0);
    pdf.save("checklist-report.pdf");
  };

  const handleSendReport = async () => {
    try {
      await axios.post("http://localhost:8080/api/checklist/report", null, {
        params: {
          email: "hr@example.com",
        },
      });
      alert("Report wurde erfolgreich an HR gesendet!");
    } catch (error) {
      console.error("Fehler beim Senden:", error);
      alert("E-Mail konnte nicht gesendet werden.");
    }
  };

  const completedCount = items.filter((item) => item.completed).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div id="checklist-container" className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">📝 Meine Checkliste</h1>

      {/* Fortschrittsanzeige */}
<div className="mb-4">
  <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
    <span>Fortschritt</span>
    <span>
      {completedCount} von {items.length} erledigt ({Math.round(progress)}%)
    </span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-4">
    <div
      className={`h-4 rounded-full transition-all duration-300 ${
        progress === 100 ? "bg-green-500" : "bg-blue-500"
      }`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>

</div>


      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-l"
          placeholder="Neues Item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Hinzufügen
        </button>
      </div>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center mb-2 bg-gray-100 p-2 rounded select-none"
          >
            <div
              className={`flex-1 cursor-pointer ${
                item.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => updateItem(item)}
            >
              {item.description}
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-red-600 hover:text-red-800 text-2xl font-bold"
            >
              &#10005;
            </button>



          </li>

        ))}
      </ul>
      <div>
        <button
          onClick={() => handleExport()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
        Exportieren als PDF
        </button>
        <button
          onClick={() => handleSendReport()}
          className="bg-blue-500 text-white px-4 py-2 ml-10 rounded hover:bg-blue-600"
        >
        Check abgeschlossen
        </button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Checklist;
