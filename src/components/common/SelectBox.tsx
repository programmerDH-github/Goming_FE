import React from "react";
import { useLayoutEffect, useState } from "react";
import Select from "react-select";

const SelectBox = React.memo(
  ({
    handleYaerUpdate,
    handleMonthUpdate,
    handleDayUpdate,
    disabled = false,
    userYear = null,
    userMonth = null,
    userDay = null,
  }: {
    handleYaerUpdate: any;
    handleMonthUpdate: any;
    handleDayUpdate: any;
    disabled?: boolean;
    userYear?: string | null;
    userMonth?: string | null;
    userDay?: string | null;
  }) => {
    const date = new Date();
    const nowYear = date.getFullYear();
    const nowMonth = ("0" + (1 + date.getMonth())).slice(-2);
    const nowDay = ("0" + date.getDate()).slice(-2);

    const setTodayDate = () => {
      // cal.current = [String(year), month, day];
      const yearList = [];
      const monthList = [];
      const dayList = [];
      // 년도 구하기
      for (let i = nowYear - 14; i >= 1931; i--) {
        yearList.push({ value: String(i), label: String(i) });
      }
      //월 구하기
      for (let i = 1; i <= 12; i++) {
        const input = i > 9 ? String(i) : "0" + i;
        monthList.push({ value: input, label: input });
      }
      //일 구하기
      for (let i = 1; i <= 31; i++) {
        var input = i > 9 ? String(i) : "0" + i;
        dayList.push({ value: input, label: input });
      }
      setCalendar({ year: yearList, month: monthList, day: dayList });
      handleYaerUpdate({ value: nowYear - 14 });
      handleMonthUpdate({ value: "01" });
      handleDayUpdate({ value: "01" });
    };

    const [calendar, setCalendar] = useState<{
      year: { value: string; label: string }[];
      month: { value: string; label: string }[];
      day: { value: string; label: string }[];
    }>({
      year: [
        {
          value: userYear || String(nowYear - 14),
          label: userYear || String(nowYear - 14),
        },
      ],
      month: [{ value: userMonth || "01", label: userMonth || "01" }],
      day: [{ value: userDay || "01", label: userDay || "01" }],
    });
    useLayoutEffect(() => {
      setTodayDate();
    }, []);

    return (
      <>
        <Select
          className="register-selectBox"
          options={calendar.year}
          placeholder="년도"
          onChange={handleYaerUpdate}
          defaultValue={calendar.year[0]}
          isDisabled={disabled}
          // styles={styles}
          styles={{
            control: (styles) => ({
              ...styles,
              width: "auto",
              height: "48px",
              fontWeight: 400,
              fontSize: "14px",
              color: disabled ? "#7A7670" : "",
              background: disabled ? "#F2F1ED" : "",
              border: "1px solid #e9e7e2",
              borderRadius: "8px",
            }),
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
        <Select
          className="register-selectBox"
          options={calendar.month}
          onChange={handleMonthUpdate}
          defaultValue={calendar.month[0]}
          placeholder="월"
          isDisabled={disabled}
          styles={{
            control: (styles) => ({
              ...styles,
              width: "auto",
              height: "48px",
              fontWeight: 400,
              fontSize: "14px",
              color: disabled ? "#7A7670" : "",
              background: disabled ? "#F2F1ED" : "",
              border: "1px solid #e9e7e2",
              borderRadius: "8px",
            }),
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
        <Select
          className="register-selectBox"
          options={calendar.day}
          onChange={handleDayUpdate}
          defaultValue={calendar.day[0]}
          placeholder="일"
          isDisabled={disabled}
          styles={{
            control: (styles) => ({
              ...styles,
              width: "auto",
              height: "48px",
              fontWeight: 400,
              fontSize: "14px",
              color: disabled ? "#7A7670" : "",
              background: disabled ? "#F2F1ED" : "",
              border: "1px solid #e9e7e2",
              borderRadius: "8px",
            }),
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </>
    );
  }
);
export default SelectBox;
