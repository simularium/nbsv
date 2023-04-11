import SimulariumViewer, { RenderStyle, SimulariumController } from "@aics/simularium-viewer";
import React from "react";

// import "antd/dist/antd.css";
// TODO: this starts as .less and needs to be converted to .css in tsc step
// import "./style.css";

// var agentColors = [
//     "#fee34d",
//     "#f7b232",
//     "#bf5736",
//     "#94a7fc",
//     "#ce8ec9",
//     "#58606c",
//     "#0ba345",
//     "#9267cb",
//     "#81dbe6",
//     "#bd7800",
//     "#bbbb99",
//     "#5b79f0",
//     "#89a500",
//     "#da8692",
//     "#418463",
//     "#9f516c",
//     "#00aabf",
// ];
var simulariumController = new SimulariumController({});

function ViewerWidget(props): JSX.Element {
    return (
        <div className="Widget">
            <SimulariumViewer
                renderStyle={RenderStyle.WEBGL2_PREFERRED}
                backgroundColor={[0, 0, 0]}
                height={300}
                width={400}
                loggerLevel="debug"
                onTimeChange={() => {}}
                simulariumController={simulariumController}
                onJsonDataArrived={() => {}}
                showCameraControls={false}
                onTrajectoryFileInfoChanged={() => {}}
                selectionStateInfo={{
                    highlightedAgents: [],
                    hiddenAgents: [],
                }}
                onUIDisplayDataChanged={() => {}}
                loadInitialData={true}
                hideAllAgents={false}
                showBounds={true}
                agentColors={[]}
                showPaths={false}
                onError={console.log}
            />
        </div>
    );
}

// function withModelContext(Component: (props: WidgetProps) => JSX.Element) {
//     return (props: WidgetProps) => (
//         <WidgetModelContext.Provider value={props.model}>
//             <Component {...props} />
//         </WidgetModelContext.Provider>
//     );
// }

export default ViewerWidget;