import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus } from 'lucide-react';

const TagView = ({ node, path, onUpdate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(node.name);

  const handleToggleCollapse = (e) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  const handleNameClick = (e) => {
    e.stopPropagation();
    setIsEditingName(true);
    setTempName(node.name);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      onUpdate(path, { ...node, name: tempName });
      setIsEditingName(false);
    } else if (e.key === 'Escape') {
      setIsEditingName(false);
    }
  };

  const handleDataChange = (e) => {
    onUpdate(path, { ...node, data: e.target.value });
  };

  const handleAddChild = (e) => {
    e.stopPropagation();
    let newNode = { ...node };
    const newChild = { name: 'New Child', data: 'Data' };

    if (newNode.data !== undefined) {
      delete newNode.data;
      newNode.children = [newChild];
    } else if (newNode.children) {
      newNode.children = [...newNode.children, newChild];
    } else {
      newNode.children = [newChild];
    }
    // Expand automatically if adding child
    setIsCollapsed(false);
    onUpdate(path, newNode);
  };

  const handleChildUpdate = (childIndex, updatedChild) => {
    const newChildren = [...node.children];
    newChildren[childIndex] = updatedChild;
    onUpdate(path, { ...node, children: newChildren });
  };

  return (
    <div className="tree-node-container">
      <div className="tree-node-header" onClick={handleToggleCollapse}>
        <div className="flex items-center gap-2">
          <button className="icon-btn focus:outline-none">
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {isEditingName ? (
            <input
              type="text"
              className="text-slate-800 text-sm h-7 py-0 px-2 rounded border-slate-300 shadow-sm"
              value={tempName}
              autoFocus
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={handleNameKeyDown}
              onBlur={() => setIsEditingName(false)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="select-none font-semibold cursor-text" onClick={handleNameClick}>
              {node.name}
            </span>
          )}
        </div>
        
        <button className="btn-secondary" onClick={handleAddChild}>
          <Plus size={14} className="mr-1" /> Add Child
        </button>
      </div>

      {!isCollapsed && (
        <div className="tree-node-content">
          {node.data !== undefined ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500 w-10">Data</span>
              <input
                type="text"
                value={node.data}
                onChange={handleDataChange}
                placeholder="Enter data..."
              />
            </div>
          ) : (
            <div className="flex flex-col">
              {node.children && node.children.map((child, index) => (
                <TagView
                  key={index}
                  node={child}
                  path={[...path, index]}
                  onUpdate={(childPath, updatedChild) => handleChildUpdate(index, updatedChild)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagView;
