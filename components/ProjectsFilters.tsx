"use client";

import Image from "next/image";
import { Select, MenuItem } from "@mui/material";
import Button from "./Button";
import CustomSwitch from "./CustomSwitch";

interface ProjectsFiltersProps {
  totalCount: number;
  filter: "all" | "favorites";
  sortOption: "alphabetical" | "recent" | "deadline";
  onFilterChange: (value: "all" | "favorites") => void;
  onSortChange: (value: "alphabetical" | "recent" | "deadline") => void;
  onCreateProject: () => void;
}

export default function ProjectsFilters({
  totalCount,
  filter,
  sortOption,
  onFilterChange,
  onSortChange,
  onCreateProject,
}: ProjectsFiltersProps) {
  return (
    <div className="flex items-center justify-between mb-[22px]">
      <div className="flex items-center gap-2">
        <p className="heading-2xl">Projetos</p>
        <span className="text-accent font-normal text-[17px] leading-none tracking-normal align-middle">({totalCount})</span>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <CustomSwitch
            checked={filter === "favorites"}
            onChange={(_event, checked) => onFilterChange(checked ? "favorites" : "all")}
          />
          <span className="font-normal text-base leading-22 tracking-normal text-text-dark">Apenas Favoritos</span>
        </div>

        <div>
          <Select
            name="orderBy"
            id="orderBy"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as ProjectsFiltersProps["sortOption"])}
            className="border border-accent bg-white w-[296px] h-10"
            sx={{
              borderRadius: "8px",
            }}
          >
            <MenuItem sx={{ borderBottom: "1px solid var(--color-border)" }} value="alphabetical">
              Ordem alfabética
            </MenuItem>
            <MenuItem sx={{ borderBottom: "1px solid var(--color-border)" }} value="recent">
              Iniciados mais recentes
            </MenuItem>
            <MenuItem value="deadline">Prazo mais próximo</MenuItem>
          </Select>
        </div>

        <Button
          variant="regular"
          size="medium"
          icon={<Image src="/images/plus-circle.svg" alt="Plus Circle" width={24} height={24} />}
          title="Novo projeto"
          onClick={onCreateProject}
        />
      </div>
    </div>
  );
}
