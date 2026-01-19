"use client";

import Image from "next/image";
import Button from "./Button";
import CustomSwitch from "./CustomSwitch";
import Select from "./Select";

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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-[22px]">
      <div className="flex items-center gap-2">
        <p className="heading-2xl">Projetos</p>
        <span className="text-accent font-normal text-[17px] leading-none tracking-normal align-middle">({totalCount})</span>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <CustomSwitch
            checked={filter === "favorites"}
            onChange={(_event, checked) => onFilterChange(checked ? "favorites" : "all")}
          />
          <span className="font-normal text-base leading-22 tracking-normal text-text-dark">Apenas Favoritos</span>
        </div>

        <div className="w-full md:w-auto">
          <Select
            value={sortOption}
            onChange={(value) => onSortChange(value as ProjectsFiltersProps["sortOption"])}
            options={[
              { value: "alphabetical", label: "Ordem alfabética" },
              { value: "recent", label: "Iniciados mais recentes" },
              { value: "deadline", label: "Prazo mais próximo" },
            ]}
            className="lg:w-[296px]"
          />
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
