import React, { useState, useMemo } from "react";
import { Drawer, Menu, Button } from "antd";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import schema from "../schema/shema.json";
import uiSchema from "../schema/uishema.json";

const CustomJsonForms = () => {
  const [open, setOpen] = useState(false);

  //recupere la partie du formulaire a afficher
  const [selectedCategory, setSelectedCategory] = useState(null);

  //recupere la clé objet des formulaires 
  const [selectedFormKey, setSelectedFormKey] = useState(null);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Selectionne dynamiquement la partie du formulaire a afficher
  const selectedUiSchema = useMemo(() => {
    if (!selectedFormKey || !selectedCategory) return null;
    return {
      type: "VerticalLayout",
      elements: selectedCategory.elements
    };
  }, [selectedCategory, selectedFormKey]);

  return (
    <div style={{ display: "flex" }}>
      <Button type="primary" onClick={showDrawer}>
        Ouvrir
      </Button>
      <Drawer title="Formulaires" placement="left" onClose={onClose} open={open}>
        <Menu mode="vertical">
          {Object.entries(uiSchema).map(([formKey, formConfig]) => (
            <Menu.SubMenu key={formKey} title={formConfig.title}>
              {formConfig.elements.map((category) => (
                <Menu.Item
                  key={`${formKey}-${category.label}`}
                  onClick={() => {
                    setSelectedFormKey(formKey);
                    setSelectedCategory(category);
                  }}
                >
                  {category.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu>
      </Drawer>

      <div style={{ flexGrow: 2, padding: "30px", maxWidth: "1200px", marginLeft: "auto" }}>
        {selectedFormKey && selectedUiSchema ? (
          <JsonForms
            schema={schema.properties[selectedFormKey]}
            uischema={selectedUiSchema}
            data={{}}
            renderers={materialRenderers}
            cells={materialCells}
          />
        ) : (
          <p>Sélectionnez une catégorie</p>
        )}
      </div>
    </div>
  );
};

export default CustomJsonForms;