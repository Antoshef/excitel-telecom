export const asd = []
// import {
//   Button,
//   createStyles,
//   InputBase,
//   makeStyles,
//   MenuItem,
//   Select,
//   Theme,
//   Typography,
// } from "@material-ui/core";
// import React, { memo, useEffect, useState } from "react";
// import _ from "lodash";
// import { IPagination } from "@models/IPagination";
// import { useDispatch } from "react-redux";
// import preferencesActions from "@actions/preferencesActions";
// import { useAppSelector } from "@helpers/hooks/useAppSelector.hook";
// import uiString from "@constants/uiString";
// import { ComponentDimensions } from "@constants/appConstants";
// import { IPreferencesTableSizeKey } from "@reducers/preferencesReducer";
// import { RowsPerPageOptions } from "@models/AppPreference.models";
// import { DEFAULT_ROWS_PER_PAGE_VALUE } from "@constants/initialStateConstants";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     pagination: {
//       paddingTop: 15,
//     },
//     label: {
//       fontSize: ComponentDimensions.PAGINATION_LABEL_FONT_SIZE,
//       paddingBottom: 9,
//       display: "flex",
//       alignItems: "center",
//     },
//     controls: {
//       display: "flex",
//       alignItems: "center",
//       paddingLeft: 1,
//       "&>button": {
//         border: "1px solid var(--color-dark-grey)",
//         borderRadius: 0,
//         display: "flex",
//         padding: "0px 8px",
//         alignItems: "center",
//         minWidth: 0,
//         height: ComponentDimensions.PAGINATION_SUBCOMPONENT_HEIGHT,
//         fontSize: ComponentDimensions.PAGINATION_INPUT_TEXT_FONT_SIZE,
//         textTransform: "none",
//         "&:first-child": {
//           borderRadius: "4px 0 0 4px",
//         },
//         "&:nth-child(4)": {
//           borderRadius: "0 4px 4px 0",
//         },
//         "&:nth-child(odd)": {
//           margin: "0px -1px",
//         },
//       },
//     },
//     input: {
//       border: "1px solid var(--color-dark-grey)",
//       width: 35,
//       height: ComponentDimensions.PAGINATION_SUBCOMPONENT_HEIGHT,
//       borderRadius: 4,
//       marginLeft: 4,
//       marginRight: 4,
//       "&>input": {
//         textAlign: "center",
//         fontSize: ComponentDimensions.PAGINATION_INPUT_TEXT_FONT_SIZE,
//         color: "#545255",
//       },
//       "&.Mui-focused": {
//         borderColor: "var(--color-bright-light-blue)",
//         borderWidth: 2,
//       },
//     },
//     // selector styles
//     rowsPerPage: { display: "flex", alignItems: "center" },
//     rowsPerPageSelect: {
//       marginRight: 5,
//       border: "1px solid var(--color-dark-grey)",
//       borderRadius: 4,
//       fontSize: ComponentDimensions.PAGINATION_INPUT_TEXT_FONT_SIZE,
//       "&>.MuiSelect-select": {
//         padding: 4,
//         textAlign: "center",
//       },
//       "&>.MuiSelect-icon": {
//         display: "none",
//       },
//       "&:before, &:after": {
//         border: "none !important",
//       },
//       "&>div": {
//         paddingLeft: 5,
//       },
//     },
//     rowsPerPageLabel: {
//       fontFamily: "'Lato', sans-serif",
//       fontSize: ComponentDimensions.PAGINATION_LABEL_FONT_SIZE,
//     },
//   })
// );

// interface IProps {
//   pagination: IPagination | null;
//   handlePageChange: (page: number) => any;
//   children: JSX.Element | JSX.Element[];
//   showControls?: boolean;
//   storeKey: IPreferencesTableSizeKey;
// }

// /**
//  * Pagination controller interface for tables
//  * @param page - current page that's displayed on the table
//  * @param pagination - pagination object of type IPagination.
//  * @param handlePageChange - handler when one of the pagination controllers fires
//  * @param children - JSX.Element, should be a table component
//  * @returns JSX.Element
//  */
// const CustomTablePagination = ({
//   pagination,
//   handlePageChange,
//   showControls = true,
//   children,
//   storeKey,
// }: IProps) => {
//   const classes = useStyles();
//   const tableSize = useAppSelector((state) => state.preferences.tableSize);
//   const [pageValue, setPageValue] = useState(1);
//   const dispatch = useDispatch();
//   const rowsPerPage = tableSize[storeKey] ?? pagination?.perPage ?? DEFAULT_ROWS_PER_PAGE_VALUE;

//   useEffect(() => {
//     pagination && setPageValue(pagination?.currentPage);
//   }, [pagination]);

//   const dispatchRowsPerPage = ({ target }) => {
//     dispatch(
//       preferencesActions.setPrefTableSize({
//         ...tableSize,
//         [storeKey]: target.value,
//       })
//     );
//   };

//   const page = pagination?.currentPage ?? 0;
//   const PAGE_NUMBER_OPTIONS_LIST: RowsPerPageOptions[] = [10, 25, 50, 100];

//   return (
//     <>
//       {pagination && showControls && (
//         <div className={classes.rowsPerPage}>
//           <Select
//             onChange={dispatchRowsPerPage}
//             value={rowsPerPage}
//             className={classes.rowsPerPageSelect}
//             MenuProps={{
//               getContentAnchorEl: null,
//               anchorOrigin: {
//                 vertical: "bottom",
//                 horizontal: "left",
//               },
//             }}
//             labelId={"rowsPerPage-selector"}
//           >
//             {PAGE_NUMBER_OPTIONS_LIST.map((item) => (
//               <MenuItem key={item} value={item}>
//                 {item}
//               </MenuItem>
//             ))}
//           </Select>
//           <Typography
//             className={classes.rowsPerPageLabel}
//             id="rowsPerPage-selector"
//             variant="body1"
//           >
//             Per Page
//           </Typography>
//         </div>
//       )}
//       {children}
//       {pagination && showControls && (
//         <div className={classes.pagination}>
//           <div className={classes.label}>
//             Displaying {pagination.from ?? 0}-{pagination.to ?? 0} of {pagination.total ?? 0}
//           </div>
//           <div className={classes.controls}>
//             <Button disabled={page === 1} onClick={() => handlePageChange(1)}>
//               First
//             </Button>
//             <Button
//               disabled={page === 1}
//               onClick={() => handlePageChange(page - 1)}
//             >
//               Previous
//             </Button>
//             <Button
//               disabled={pagination.totalPages === page}
//               onClick={() => handlePageChange(page + 1)}
//             >
//               {uiString.NEXT}
//             </Button>
//             <Button
//               disabled={pagination.totalPages === page}
//               onClick={() => handlePageChange(pagination.totalPages)}
//             >
//               Last
//             </Button>
//             <div
//               className={classes.label}
//               style={{ marginLeft: 15, padding: 0 }}
//             >
//               Page
//               <InputBase
//                 className={classes.input}
//                 onChange={(e) => {
//                   const val = Number(e.target.value);
//                   if (_.isFinite(val) && val <= pagination.totalPages) {
//                     setPageValue(val);
//                   }
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && pageValue) {
//                     handlePageChange(pageValue);
//                   }
//                 }}
//                 value={pageValue}
//               />{" "}
//               of {pagination.totalPages === 0 ? 1 : pagination.totalPages}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default memo(CustomTablePagination)
