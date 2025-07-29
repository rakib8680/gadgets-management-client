import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { toCamelCase } from "@/utils/camelCase";

// Type for a single key-value pair
interface KeyValuePair {
  id: string;
  key: string;
  value: string | number | boolean;
  type: "string" | "number" | "boolean";
}

// Component props
interface GM_ObjectBuilderProps {
  name: string; // the form field name in react-hook-form
  label: string; // label to display above the field
}

const GM_ObjectBuilder = ({ name, label }: GM_ObjectBuilderProps) => {
  // Access form context methods
  const { setValue, getValues } = useFormContext();

  // Initialize pairs from default value once
  const initialPairs: KeyValuePair[] = (() => {
    const defaultValue = getValues(name);
    if (
      defaultValue &&
      typeof defaultValue === "object" &&
      Object.keys(defaultValue).length > 0
    ) {
      return Object.entries(defaultValue).map(([key, value], i) => ({
        id: `pair-${i}`,
        key,
        value: value as string | number | boolean,
        type: typeof value as "string" | "number" | "boolean",
      }));
    }
    return [{ id: "pair-0", key: "", value: "", type: "string" }];
  })();

  // Local state to manage the array of key-value pairs
  const [pairs, setPairs] = useState<KeyValuePair[]>(initialPairs);

  // Whenever pairs change, convert to object and update the form field
  useEffect(() => {
    const object = pairs.reduce((acc, pair) => {
      if (pair.key.trim()) {
        let val: any = pair.value;
  
        // Convert value based on its selected type
        if (pair.type === "number") val = Number(val);
        else if (pair.type === "boolean") val = val === "true" || val === true;
  
        // Convert key to camelCase before assigning
        const camelKey = toCamelCase(pair.key.trim());
  
        acc[camelKey] = val;
      }
      return acc;
    }, {} as Record<string, any>);
  
    setValue(name, object);
  }, [pairs, setValue, name]);
  

  // Update a specific field (key, value, or type) of a pair
  const updatePair = (id: string, field: keyof KeyValuePair, value: any) => {
    setPairs((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, [field]: value };

          // Reset value if type changes
          if (field === "type") {
            if (value === "number") updated.value = 0;
            else if (value === "boolean") updated.value = false;
            else updated.value = "";
          }

          return updated;
        }
        return p;
      })
    );
  };

  // Add a new empty key-value pair
  const addPair = () => {
    setPairs((prev) => [
      ...prev,
      { id: `pair-${Date.now()}`, key: "", value: "", type: "string" },
    ]);
  };

  // Remove a key-value pair by its ID (only if more than one exists)
  const removePair = (id: string) => {
    if (pairs.length > 1) {
      setPairs(pairs.filter((p) => p.id !== id));
    }
  };

  // Render the input field for the value, depending on the selected type
  const renderValueInput = (pair: KeyValuePair) => {
    switch (pair.type) {
      case "boolean":
        return (
          <Select
            value={String(pair.value)}
            onValueChange={(val) =>
              updatePair(pair.id, "value", val === "true")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );
      case "number":
        return (
          <Input
            type="number"
            value={pair.value.toString()}
            onChange={(e) => updatePair(pair.id, "value", e.target.value)}
          />
        );
      default: // "string"
        return (
          <Input
            type="text"
            // className="w-2/3"
            value={pair.value.toString()}
            onChange={(e) => updatePair(pair.id, "value", e.target.value)}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {/* Label for the entire key-value input section */}
      <Label className="text-sm font-medium">{label}</Label>

      {/* Render each key-value pair row */}
      {pairs.map((pair) => (
        <div key={pair.id} className="flex gap-2 items-end justify-between">
          {/* Key input */}
          <Input
            placeholder="Key"
            className="w-64"
            value={pair.key}
            onChange={(e) => updatePair(pair.id, "key", e.target.value)}
          />

          {/* Type selector */}
          <div>
            <Select
              value={pair.type}
              onValueChange={(val) =>
                updatePair(
                  pair.id,
                  "type",
                  val as "string" | "number" | "boolean"
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Value input */}
          <div className="flex-1">{renderValueInput(pair)}</div>

          {/* Add new row button */}
          <Button type="button" variant="outline" size="sm" onClick={addPair}>
            <Plus className="h-4 w-4" />
          </Button>

          {/* Remove row button (if more than one) */}
          {pairs.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removePair(pair.id)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default GM_ObjectBuilder;
