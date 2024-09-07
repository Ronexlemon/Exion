import * as React from "react"
import Svg, { Path, Mask } from "react-native-svg"

const Settings = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={26}
        height={26}
        fill="none"
        {...props}
    >
        <Mask
            id="a"
            width={23}
            height={24}
            x={1.194}
            y={0.838}
            fill="#000"
            maskUnits="userSpaceOnUse"
        >
            <Path fill="#fff" d="M1.194.838h23v24h-23z" />
            <Path d="M16.635 12.775a3.907 3.907 0 1 1-7.813 0 3.907 3.907 0 0 1 7.813 0Zm-.781 0a3.125 3.125 0 1 0-6.25 0 3.125 3.125 0 0 0 6.25 0ZM4.838 5.201a.75.75 0 0 1 .856-.151l1.406.648A1.562 1.562 0 0 0 9.303 4.49l.232-1.7a.75.75 0 0 1 .555-.632c.863-.213 1.749-.32 2.638-.32.91 0 1.794.111 2.639.32a.75.75 0 0 1 .555.632l.232 1.7a1.562 1.562 0 0 0 2.202 1.208l1.406-.648a.75.75 0 0 1 .856.15 10.938 10.938 0 0 1 2.617 4.528.75.75 0 0 1-.299.816l-1.356.953a1.563 1.563 0 0 0 0 2.557l1.357.954a.749.749 0 0 1 .298.815 10.938 10.938 0 0 1-2.617 4.527.75.75 0 0 1-.855.151l-1.408-.648a1.563 1.563 0 0 0-2.201 1.208l-.232 1.7a.75.75 0 0 1-.555.632c-.863.213-1.75.32-2.64.32-.889 0-1.775-.107-2.638-.32a.75.75 0 0 1-.555-.632l-.231-1.7A1.563 1.563 0 0 0 7.1 19.853l-1.406.648a.75.75 0 0 1-.856-.15 10.937 10.937 0 0 1-2.617-4.529.75.75 0 0 1 .298-.816l1.357-.953a1.563 1.563 0 0 0 0-2.557l-1.357-.953a.75.75 0 0 1-.298-.817 10.94 10.94 0 0 1 2.617-4.525ZM2.98 9.914l1.345.944a2.344 2.344 0 0 1 0 3.836l-1.344.945a10.156 10.156 0 0 0 2.399 4.148l1.393-.643a2.344 2.344 0 0 1 3.303 1.811l.23 1.688c.776.189 1.587.29 2.423.29.815 0 1.628-.097 2.42-.29l.23-1.688a2.343 2.343 0 0 1 3.304-1.81l1.394.642a10.157 10.157 0 0 0 2.399-4.149l-1.344-.944a2.344 2.344 0 0 1 0-3.836l1.344-.944a10.156 10.156 0 0 0-2.399-4.149l-1.394.643a2.344 2.344 0 0 1-3.303-1.81l-.231-1.688a10.205 10.205 0 0 0-4.842 0l-.23 1.687a2.345 2.345 0 0 1-3.304 1.81L5.38 5.766a10.158 10.158 0 0 0-2.4 4.149Z" />
        </Mask>
        <Path
            fill="#00C48F"
            d="M16.635 12.775a3.907 3.907 0 1 1-7.813 0 3.907 3.907 0 0 1 7.813 0Zm-.781 0a3.125 3.125 0 1 0-6.25 0 3.125 3.125 0 0 0 6.25 0ZM4.838 5.201a.75.75 0 0 1 .856-.151l1.406.648A1.562 1.562 0 0 0 9.303 4.49l.232-1.7a.75.75 0 0 1 .555-.632c.863-.213 1.749-.32 2.638-.32.91 0 1.794.111 2.639.32a.75.75 0 0 1 .555.632l.232 1.7a1.562 1.562 0 0 0 2.202 1.208l1.406-.648a.75.75 0 0 1 .856.15 10.938 10.938 0 0 1 2.617 4.528.75.75 0 0 1-.299.816l-1.356.953a1.563 1.563 0 0 0 0 2.557l1.357.954a.749.749 0 0 1 .298.815 10.938 10.938 0 0 1-2.617 4.527.75.75 0 0 1-.855.151l-1.408-.648a1.563 1.563 0 0 0-2.201 1.208l-.232 1.7a.75.75 0 0 1-.555.632c-.863.213-1.75.32-2.64.32-.889 0-1.775-.107-2.638-.32a.75.75 0 0 1-.555-.632l-.231-1.7A1.563 1.563 0 0 0 7.1 19.853l-1.406.648a.75.75 0 0 1-.856-.15 10.937 10.937 0 0 1-2.617-4.529.75.75 0 0 1 .298-.816l1.357-.953a1.563 1.563 0 0 0 0-2.557l-1.357-.953a.75.75 0 0 1-.298-.817 10.94 10.94 0 0 1 2.617-4.525ZM2.98 9.914l1.345.944a2.344 2.344 0 0 1 0 3.836l-1.344.945a10.156 10.156 0 0 0 2.399 4.148l1.393-.643a2.344 2.344 0 0 1 3.303 1.811l.23 1.688c.776.189 1.587.29 2.423.29.815 0 1.628-.097 2.42-.29l.23-1.688a2.343 2.343 0 0 1 3.304-1.81l1.394.642a10.157 10.157 0 0 0 2.399-4.149l-1.344-.944a2.344 2.344 0 0 1 0-3.836l1.344-.944a10.156 10.156 0 0 0-2.399-4.149l-1.394.643a2.344 2.344 0 0 1-3.303-1.81l-.231-1.688a10.205 10.205 0 0 0-4.842 0l-.23 1.687a2.345 2.345 0 0 1-3.304 1.81L5.38 5.766a10.158 10.158 0 0 0-2.4 4.149Z"
        />
        <Path
            stroke="#00C48F"
            strokeWidth={0.6}
            d="M16.635 12.775a3.907 3.907 0 1 1-7.813 0 3.907 3.907 0 0 1 7.813 0Zm-.781 0a3.125 3.125 0 1 0-6.25 0 3.125 3.125 0 0 0 6.25 0ZM4.838 5.201a.75.75 0 0 1 .856-.151l1.406.648A1.562 1.562 0 0 0 9.303 4.49l.232-1.7a.75.75 0 0 1 .555-.632c.863-.213 1.749-.32 2.638-.32.91 0 1.794.111 2.639.32a.75.75 0 0 1 .555.632l.232 1.7a1.562 1.562 0 0 0 2.202 1.208l1.406-.648a.75.75 0 0 1 .856.15 10.938 10.938 0 0 1 2.617 4.528.75.75 0 0 1-.299.816l-1.356.953a1.563 1.563 0 0 0 0 2.557l1.357.954a.749.749 0 0 1 .298.815 10.938 10.938 0 0 1-2.617 4.527.75.75 0 0 1-.855.151l-1.408-.648a1.563 1.563 0 0 0-2.201 1.208l-.232 1.7a.75.75 0 0 1-.555.632c-.863.213-1.75.32-2.64.32-.889 0-1.775-.107-2.638-.32a.75.75 0 0 1-.555-.632l-.231-1.7A1.563 1.563 0 0 0 7.1 19.853l-1.406.648a.75.75 0 0 1-.856-.15 10.937 10.937 0 0 1-2.617-4.529.75.75 0 0 1 .298-.816l1.357-.953a1.563 1.563 0 0 0 0-2.557l-1.357-.953a.75.75 0 0 1-.298-.817 10.94 10.94 0 0 1 2.617-4.525ZM2.98 9.914l1.345.944a2.344 2.344 0 0 1 0 3.836l-1.344.945a10.156 10.156 0 0 0 2.399 4.148l1.393-.643a2.344 2.344 0 0 1 3.303 1.811l.23 1.688c.776.189 1.587.29 2.423.29.815 0 1.628-.097 2.42-.29l.23-1.688a2.343 2.343 0 0 1 3.304-1.81l1.394.642a10.157 10.157 0 0 0 2.399-4.149l-1.344-.944a2.344 2.344 0 0 1 0-3.836l1.344-.944a10.156 10.156 0 0 0-2.399-4.149l-1.394.643a2.344 2.344 0 0 1-3.303-1.81l-.231-1.688a10.205 10.205 0 0 0-4.842 0l-.23 1.687a2.345 2.345 0 0 1-3.304 1.81L5.38 5.766a10.158 10.158 0 0 0-2.4 4.149Z"
            mask="url(#a)"
        />
    </Svg>
)

export default Settings