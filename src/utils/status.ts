import { getServiceInfo } from './processCheck';
import { getCurrentClaudePath } from './system';

export async function showStatus() {
    const info = await getServiceInfo();
    const claudeInfo = await getCurrentClaudePath();
    
    console.log('\n📊 Claude Code Router Status');
    console.log('═'.repeat(40));
    
    if (info.running) {
        console.log('✅ Status: Running');
        console.log(`🆔 Process ID: ${info.pid}`);
        console.log(`🌐 Port: ${info.port}`);
        console.log(`📡 API Endpoint: ${info.endpoint}`);
        console.log(`📄 PID File: ${info.pidFile}`);
        console.log('');
        console.log('🔧 Claude Executable Configuration:');
        console.log(`   📍 Path: ${claudeInfo.path}`);
        if (claudeInfo.version) {
            console.log(`   📦 Version: ${claudeInfo.version}`);
        }
        console.log(`   📋 Source: ${claudeInfo.source}`);
        console.log('');
        console.log('🚀 Ready to use! Run the following commands:');
        console.log('   ccr code    # Start coding with Claude');
        console.log('   ccr stop   # Stop the service');
    } else {
        console.log('❌ Status: Not Running');
        console.log('');
        console.log('🔧 Claude Executable Configuration:');
        console.log(`   📍 Path: ${claudeInfo.path}`);
        if (claudeInfo.version) {
            console.log(`   📦 Version: ${claudeInfo.version}`);
        }
        console.log(`   📋 Source: ${claudeInfo.source}`);
        console.log('');
        console.log('💡 To start the service:');
        console.log('   ccr start');
    }
    
    console.log('');
}
