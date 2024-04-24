import React, { useState } from "react";

const InputBox = React.memo(
  ({
    title, //  제목
    inputHeight = "48px",
    buttonTitle, // 버튼 제목
    inputPlaceholader,
    inputMaxLength = 30,
    id,
    inputClassName,
    inputChange,
    inputValue,
    inputBlur = () => {},
    buttonClick,
    errObject,
    isButton = true,
    isDisable = false,
    inputType = "text",
    isClose = false,
    closeClick,
    buttonClass,
    isButtonDisable = false,
  }: {
    title?: string;
    inputHeight?: string;
    buttonTitle?: string;
    inputPlaceholader?: string;
    inputMaxLength?: number;
    id: string;
    inputClassName: string;
    inputChange?: any;
    inputBlur?: any;
    inputValue: string;
    buttonClick?: any;
    errObject?: any;
    isButton?: boolean;
    isDisable?: boolean;
    inputType?: string;
    isClose?: boolean | null;
    closeClick?: any;
    buttonClass?: any;
    isButtonDisable?: any;
  }) => {
    const [completeInputChk, setCompleteInputChk] = useState<boolean>(false);
    return (
      <>
        <div
          className={inputClassName}
          style={{
            height: title ? "100%" : inputHeight,
          }}
        >
          <div className="register-box">
            {title ? <div className="body3-bold">{title}</div> : <></>}
            <input
              type={inputType}
              placeholder={inputPlaceholader}
              id={id}
              className={
                completeInputChk === true
                  ? isClose === true
                    ? "register-input-error body3-bold margintop-8"
                    : isClose === false
                    ? "register-input-complete body3-bold margintop-8"
                    : isClose === null
                    ? "register-input-success body3-bold margintop-8"
                    : ""
                  : isClose === true
                  ? "register-input-error body3-bold margintop-8"
                  : isClose === false
                  ? "register-input body3-bold margintop-8"
                  : isClose === null
                  ? "register-input-success body3-bold margintop-8"
                  : ""
              }
              // style={{ background: nickNameChk ? "" : "red" }}
              onChange={inputChange}
              onBlur={() => {
                if (inputValue.length > 0) {
                  setCompleteInputChk(true);
                } else {
                  setCompleteInputChk(false);
                }
                inputBlur();
              }}
              onFocus={() => {
                setCompleteInputChk(false);
              }}
              value={inputValue}
              maxLength={inputMaxLength}
              disabled={isDisable}
            />
          </div>
          {/* {isClose === true ? (
            <div style={{ position: "relative" }}>
              <label
                htmlFor="passwordReconfirm"
                className={
                  isButton
                    ? "register-inputBox-close"
                    : "register-inputBoxButton-close"
                }
                onClick={() => {
                  closeClick();
                }}
              ></label>
            </div>
          ) : (
            <></>
          )} */}
          {isButton ? (
            <button
              type="button"
              className={
                title
                  ? "register-button btn-p-xl body3-bold margintop-28 " +
                    buttonClass
                  : "register-button btn-p-xl body3-bold margintop-8 " +
                    buttonClass
              }
              disabled={isButtonDisable}
              onClick={buttonClick}
            >
              {buttonTitle}
            </button>
          ) : (
            <></>
          )}
        </div>
        {errObject}
        {/* {inputCheck === false ? (
          <div className={errClassName}>{errMsg}</div>
        ) : (
          <></>
        )} */}
      </>
    );
  }
);
export default InputBox;
