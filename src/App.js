import { jsx as _jsx } from "react/jsx-runtime";
import React, { Suspense } from "react";
const Microfront1 = React.lazy(() => import("microfront1/App"));
// const Microfront2 = React.lazy(() => import("microfront2/App"));
function App() {
    return (_jsx("div", { className: "w-full h-full flex justify-center items-center bg-red-200 text-7xl font-medium", children: _jsx(Suspense, { fallback: _jsx("div", { children: "Cargando microfont1..." }), children: _jsx(Microfront1, {}) }) }));
}
export default App;
