import { useState } from "react"
import { Col, Row } from "react-bootstrap"

export const ThaiExporterList = ({list}) => {

    
  return (
    <div>
        {
            Array.from(list).map((data, id) =>(
                <div key={id}>
                    <pre>{data.sector}</pre>
                    <>
                        {Array.from(data.exporters).map((data,id) =>(
                            <div key={id}>
                                <pre>{data.brand}</pre>
                                <img src={data.logo} alt={`logo of ${data.brand}`} />
                            </div>
                        ))}
                    </>
                </div>
            ))
        }
    </div>
  )
}
