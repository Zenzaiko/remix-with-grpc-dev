fn main() -> Result<(), Box<dyn std::error::Error>> {
    // tonic_build::configure().compile(
    //     &["../proto/greeting.proto", "../proto/forum.proto"],
    //     &["../proto"],
    // )?;
    tonic_build::compile_protos("../proto/greeting.proto").unwrap();
    tonic_build::compile_protos("../proto/forum.proto").unwrap();
    Ok(())
}
