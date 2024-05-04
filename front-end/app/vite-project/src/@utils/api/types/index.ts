export namespace Types {
    export interface APIDataResponse<T = any> {
        payload?: T,
        success: boolean,
        error?: any, 
    }
    
    
    export namespace Terminal {
        export interface FetchAll {
            terminals: Array<any>
            terminalMap: {
                [key: string]: string
            }
            defaultTerminal: any | undefined
        }    
    }

    export namespace BusinessDiscussion {
        export namespace Type {
            export interface FetchAll {
                types: Array<any>,
                typeMap: {
                    [key: string]: any
                }
            }
        }

        export namespace Category {
            export interface FetchAll {
                categories: Array<any>,
                categoryMap: {
                    [key: string]: any
                }
            }
        }
    }

    export namespace Linehaul {
        export namespace Location {
            export interface FetchAll {
                locations: Array<any>
                locationMap: {
                    [key: string]: string
                }
            }   
        } 

        export namespace RunSheet {
            export interface FetchAllLocation {
                locations: Array<any>
                locationMap: {
                    [key: string]: any
                }
            }   
        } 

        export namespace Truck {
            export interface FetchTrucks {
                trucks: Array<any>
                truckMap: {
                    [key: string]: any
                }
            }
        }
    }

    export namespace PD {
        export namespace Assignment {
            export interface FetchAll {
                assignments: Array<any>
                assignmentMap: {
                    [key: string]: any
                }
            }    
        }

        export interface FetchTrucksSimple {
            trucks: Array<any>
            truckMap: {
                [key: string]: any
            }
        }
    }

    export namespace User {
        export interface Tasks {
            // taskData: Array<any>, 
            taskCount: {
                workOrders: number, 
                runSheetsPD: number,
                runSheetsLH: number, 
                locations: number
            }
        }
    }

}