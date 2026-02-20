"""
Blender export script: .3mf (mm) -> .glb (meters)

Usage:
  blender --background --python scripts/export-glb.py -- input.3mf output-dir

Example:
  blender --background --python scripts/export-glb.py -- \
    "source/Crescent Moon Lamp.3mf" "public/models/islamic"

The glTF/GLB spec uses meters as the unit of measurement.
3MF files use millimeters. This script scales by 0.001 so
AR viewers (Scene Viewer, Quick Look) display the model at
its true real-world size.
"""

import sys
import os
import re

import bpy


def clean_filename(name):
    """Convert a filename to lowercase kebab-case."""
    name = os.path.splitext(os.path.basename(name))[0]
    name = re.sub(r"[^\w\s-]", "", name)
    name = re.sub(r"[\s_]+", "-", name).strip("-").lower()
    return name


def main():
    # Parse args after "--"
    argv = sys.argv
    if "--" not in argv:
        print("Usage: blender --background --python export-glb.py -- input.3mf output-dir")
        sys.exit(1)

    args = argv[argv.index("--") + 1 :]
    if len(args) < 2:
        print("Usage: blender --background --python export-glb.py -- input.3mf output-dir")
        sys.exit(1)

    input_path = os.path.abspath(args[0])
    output_dir = os.path.abspath(args[1])

    if not os.path.isfile(input_path):
        print(f"Error: input file not found: {input_path}")
        sys.exit(1)

    if not input_path.lower().endswith(".3mf"):
        print(f"Error: expected .3mf file, got: {input_path}")
        sys.exit(1)

    os.makedirs(output_dir, exist_ok=True)

    # Clear default scene
    bpy.ops.wm.read_factory_settings(use_empty=True)

    # Import .3mf (units are in millimeters)
    bpy.ops.import_mesh.threemf(filepath=input_path)

    # Select all imported objects
    bpy.ops.object.select_all(action="SELECT")

    # Scale mm -> meters (0.001)
    bpy.ops.transform.resize(value=(0.001, 0.001, 0.001))
    bpy.ops.object.transform_apply(scale=True)

    # Derive output filename
    out_name = clean_filename(input_path) + ".glb"
    out_path = os.path.join(output_dir, out_name)

    # Export as GLB
    bpy.ops.export_scene.gltf(
        filepath=out_path,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
    )

    print(f"Exported: {out_path}")


if __name__ == "__main__":
    main()
