public class PivotBasedCameraRigUScript extends AbstractTargetFollowerUScript
    {
        // This script is designed to be placed on the root object of a camera rig,
        // comprising 3 gameobjects, each parented to the next:

        // 	Camera Rig
        // 		Pivot
        // 			Camera

        var  m_Cam: Transform; // the transform of the camera
        var  m_Pivot: Transform; // the point at which the camera pivots around
        var  m_LastTargetPosition: Vector3;
		var m_PivotOriginalPos : Vector3;

        function Awake()
        {
            // find the camera in the object hierarchy
            m_Cam = GetComponentInChildren.<Camera>().transform;
            m_Pivot = m_Cam.parent;
            m_PivotOriginalPos = m_Pivot.localPosition;
        }
    }

