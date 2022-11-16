import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SimpleTable } from "./simple-table";
import advancedFormat from "dayjs/plugin/advancedFormat";
import djs from "dayjs";
import { action } from "@storybook/addon-actions";
import { SortData } from "../dist/types";
import { randEmail, randFullName, randPastDate } from "@ngneat/falso";

djs.extend(advancedFormat);

const data = Array(20)
  .fill(1)
  .map(() => {
    const date = randPastDate();
    return {
      name: randFullName(),
      contact: {
        email: randEmail()
      },
      dob: {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
      }
    };
  });

const logOnSort = action("Sorting data");
const logOnRowClick = action("Clicked row");

export default {
  title: "Simple Table",
  component: SimpleTable
} as ComponentMeta<typeof SimpleTable>;

export const Default: ComponentStory<typeof SimpleTable> = () => {
  return (
    <SimpleTable
      data={data}
      dataKeyFn={item => item?.name || "empty"}
      cols={[
        ["name", "Name", "name"],
        ["email", "Email", "contact.email"],
        [
          "dob",
          <i>Date Of Birth</i>,
          item =>
            djs(`${item.dob.year}-${item.dob.month}-${item.dob.day}`).format(
              "Do MMMM YYYY"
            )
        ]
      ]}
    />
  );
};

export const ColumnVisibility: ComponentStory<typeof SimpleTable> = () => {
  return (
    <SimpleTable
      data={data}
      dataKeyFn={item => item?.name || "empty"}
      cols={[
        ["name", "Name", "name"],
        [
          "email",
          "Email (Visible on medium screens)",
          "contact.email",
          { visibility: "md" }
        ],
        [
          "dob",
          <i>DOB (Visible on large screens)</i>,
          item =>
            djs(`${item.dob.year}-${item.dob.month}-${item.dob.day}`).format(
              "Do MMMM YYYY"
            ),
          { visibility: "lg" }
        ]
      ]}
    />
  );
};

export const ColumnHeaderVisibility: ComponentStory<
  typeof SimpleTable
> = () => {
  return (
    <SimpleTable
      data={data}
      dataKeyFn={item => item?.name || "empty"}
      cols={[
        ["name", "Name", "name"],
        [
          "email",
          "Email (Header visible on medium screens)",
          "contact.email",
          { headerVisibility: "md" }
        ],
        [
          "dob",
          <i>DOB (Header visible on large screens)</i>,
          item =>
            djs(`${item.dob.year}-${item.dob.month}-${item.dob.day}`).format(
              "Do MMMM YYYY"
            ),
          { headerVisibility: "lg" }
        ]
      ]}
    />
  );
};

export const DisplayCardsOnMobile: ComponentStory<typeof SimpleTable> = () => {
  return (
    <SimpleTable
      data={data}
      dataKeyFn={item => item?.name || "empty"}
      cols={[
        ["name", "Name", "name"],
        ["email", "Email", "contact.email"],
        [
          "dob",
          <i>Date Of Birth</i>,
          item =>
            djs(`${item.dob.year}-${item.dob.month}-${item.dob.day}`).format(
              "Do MMMM YYYY"
            )
        ]
      ]}
      useCards
    />
  );
};

export const Sorting: ComponentStory<typeof SimpleTable> = () => {
  const [sort, setSort] = useState<SortData>({ id: "name", dir: "asc" });

  const onSort = (data: SortData) => {
    setSort(data);
    logOnSort(data);
  };

  return (
    <SimpleTable
      data={data}
      dataKeyFn={item => item?.name || "empty"}
      cols={[
        ["name", "Name", "name"],
        ["email", "Email", "contact.email"],
        [
          "dob",
          <i>Date Of Birth</i>,
          item =>
            djs(`${item.dob.year}-${item.dob.month}-${item.dob.day}`).format(
              "Do MMMM YYYY"
            )
        ]
      ]}
      trAttrsBuilder={item => ({
        onClick: event => logOnRowClick({ event, item })
      })}
      sort={sort}
      onSort={onSort}
    />
  );
};

export const Loading: ComponentStory<typeof SimpleTable> = () => {
  return (
    <SimpleTable
      data={data}
      dataKeyFn={item => item?.name || "empty"}
      cols={[
        ["name", "Name", "name"],
        ["email", "Email", "contact.email"],
        [
          "dob",
          <i>Date Of Birth</i>,
          item =>
            djs(`${item.dob.year}-${item.dob.month}-${item.dob.day}`).format(
              "Do MMMM YYYY"
            )
        ]
      ]}
      loading
    />
  );
};

export const CustomBreakpoint: ComponentStory<typeof SimpleTable> = () => {
  return (
    <SimpleTable
      data={data}
      dataKeyFn={item => item?.name || "empty"}
      cols={[
        ["name", "Name", "name"],
        ["email", "Email", "contact.email"],
        [
          "dob",
          <i>Date Of Birth</i>,
          item =>
            djs(`${item.dob.year}-${item.dob.month}-${item.dob.day}`).format(
              "Do MMMM YYYY"
            )
        ]
      ]}
      breakpoint="lg"
      useCards
    />
  );
};

export const CustomThAndTdBuilders: ComponentStory<typeof SimpleTable> = () => {
  return (
    <SimpleTable
      data={data}
      dataKeyFn={item => item?.name || "empty"}
      cols={[
        ["name", "Name", "name"],
        ["email", "Email", "contact.email"],
        [
          "dob",
          <i>Date Of Birth</i>,
          item =>
            djs(`${item.dob.year}-${item.dob.month}-${item.dob.day}`).format(
              "Do MMMM YYYY"
            )
        ]
      ]}
      thBuilder={val => (
        <span style={{ textDecoration: "line-through" }}>{val}</span>
      )}
      tdBuilder={val => (
        <span>
          {val}{" "}
          <small style={{ fontSize: "75%", opacity: "0.5" }}>
            ({val.length} chars)
          </small>
        </span>
      )}
      useCards
    />
  );
};
