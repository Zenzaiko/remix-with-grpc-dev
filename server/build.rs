fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::compile_protos("../proto/greeting.proto").unwrap();
    tonic_build::compile_protos("../proto/forum.proto").unwrap();
    tonic_build::compile_protos("../proto/chat.proto").unwrap();
    Ok(())
}
