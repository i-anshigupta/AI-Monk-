import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TagView from './components/TagView';
import { Network, Save, Copy, Check } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const App = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportJson, setExportJson] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchTrees();
  }, []);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const fetchTrees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trees`);
      if (response.data.length === 0) {
        const initialTree = {
          tree_data: {
            name: 'root',
            children: [
              {
                name: 'child1',
                children: [
                  { name: 'child1-child1', data: 'c1-c1 Hello' },
                  { name: 'child1-child2', data: 'c1-c2 JS' }
                ]
              },
              { name: 'child2', data: 'c2 World' }
            ]
          }
        };
        setTrees([{ ...initialTree, id: null }]);
      } else {
        setTrees(response.data);
      }
    } catch (error) {
      console.error('Error fetching trees:', error);
      setTrees([{
        id: null,
        tree_data: {
          name: 'root',
          children: [{ name: 'child1', data: 'Welcome' }]
        }
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTree = (treeIndex, updatedData) => {
    const newTrees = [...trees];
    newTrees[treeIndex] = { ...newTrees[treeIndex], tree_data: updatedData };
    setTrees(newTrees);
  };

  const handleExport = async (treeIndex) => {
    const tree = trees[treeIndex];
    const cleanTree = (node) => {
      const result = { name: node.name };
      if (node.data !== undefined) result.data = node.data;
      if (node.children) result.children = node.children.map(cleanTree);
      return result;
    };

    const exportedData = cleanTree(tree.tree_data);
    setExportJson(JSON.stringify(exportedData, null, 2));

    try {
      if (tree.id) {
        await axios.put(`${API_BASE_URL}/trees/${tree.id}`, { tree_data: tree.tree_data });
      } else {
        const response = await axios.post(`${API_BASE_URL}/trees`, { tree_data: tree.tree_data });
        const newTrees = [...trees];
        newTrees[treeIndex] = response.data;
        setTrees(newTrees);
      }
    } catch (error) {
      console.error('Error saving tree:', error);
    }
  };

  const highlightJson = (json) => {
    if (!json) return '';
    return json
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = 'text-amber-600'; // numbers
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-indigo-600 font-semibold'; // keys
          } else {
            cls = 'text-emerald-600'; // strings
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-blue-500 font-bold'; // booleans
        } else if (/null/.test(match)) {
          cls = 'text-slate-400 italic'; // null
        }
        return `<span class="${cls}">${match}</span>`;
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">


        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full">
            {trees.map((tree, index) => (
              <div key={tree.id || `new-${index}`} className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <TagView 
                  node={tree.tree_data} 
                  path={[]} 
                  onUpdate={(path, updatedNode) => handleUpdateTree(index, updatedNode)} 
                />
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => handleExport(index)}
                    className="btn-primary"
                  >
                    <Save size={16} />
                    Export & Save
                  </button>
                </div>
              </div>
            ))}
          </div>

          {exportJson && (
            <div className="lg:w-[500px] w-full lg:sticky lg:top-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 ring-1 ring-black/5">
              <div className="bg-indigo-50/80 backdrop-blur-sm px-6 py-4 border-b border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-indigo-900 text-[11px] font-extrabold tracking-[0.15em] uppercase">
                    Exported Data Tab
                  </h3>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(exportJson);
                    setCopied(true);
                  }}
                  className={`transition-all duration-200 p-2 rounded-lg flex items-center gap-2 ${
                    copied 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100'
                  }`}
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied && <span className="text-[10px] font-bold uppercase">Copied</span>}
                </button>
              </div>
              <div className="p-8 overflow-x-auto max-h-[75vh] overflow-y-auto bg-[#fafbff]">
                <pre 
                  className="text-[13px] font-mono leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: highlightJson(exportJson) }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
